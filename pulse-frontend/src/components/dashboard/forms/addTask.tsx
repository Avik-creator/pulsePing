"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Globe, Loader2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { addTasks } from "@/actions/task";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine((val) => val.startsWith("https://"), {
      message: "URL must start with https://",
    }),
  notify: z.boolean().optional(),
});

export default function AddTaskForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      notify: false,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const addTaskRes = await addTasks(values);
      if (!addTaskRes?.success) {
        throw new Error(addTaskRes?.message);
      }

      toast("Task added successfully", {
        description: "We will start monitoring the url shortly.",
        duration: 5000,
        position: "bottom-right",
        className: "bg-green-500 text-white",
      });
      await queryClient.invalidateQueries({ queryKey: ["pingTask"] });
      form.reset();
    } catch (err: unknown) {
      toast("Task failed to add", {
        description: err instanceof Error ? err.message : 'An unknown error occurred',
        duration: 5000,
        position: "bottom-right",
        className: "bg-red-500 text-white",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardDescription className="flex flex-col gap-2">
          <AlertCircle className="text-red-300" />
          <span className="text-red-200">
            By default, we will send an email notification if this server
            returns any status code other than 200.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com"
                        {...field}
                        className="pl-8"
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the URL of the server you want to monitor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notify"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Email Notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications via Email when server status
                      changes.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(handleSubmit)} className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Add Task"}
        </Button>
      </CardFooter>
    </Card>
  );
}
