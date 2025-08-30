import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowUp } from "lucide-react";
import { getPulseTasks } from "@/actions/task";
import { TaskCard } from "@/components/dashboard/task/taskCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PulseTask } from "@/types";

export const TaskContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pingTask"],
    queryFn: async () => getPulseTasks(),
    refetchInterval: 1000 * 60 * 5,
  });
  if (isLoading) {
    return (
      <div className="space-y-4 w-full md:w-[80%]">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              className="h-12  bg-muted-foreground rounded-xl"
              key={`skeleton-${index}`}
            />
          ))}
      </div>
    );
  }

  if (data?.data?.pings?.length === 0) {
    return (
      <Card className="w-full md:w-[80%] mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <ArrowUp className="w-12 h-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-sm text-muted-foreground">
            Use the button above to add your first task and start being
            productive!
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full md:w-[80%] mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="w-12 h-12 mb-4 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full md:w-[80%] flex justify-center items-start flex-col gap-3">
      {data?.data?.pings.map((task: PulseTask) => {
        return <TaskCard key={task.ID} Task={task} />;
      })}
    </div>
  );
};
