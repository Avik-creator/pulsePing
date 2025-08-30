"use server";
import axios from "axios";
import { withServerActionAsyncCatcher } from "../lib/async-wrapper";
import { SuccessResponse } from "../lib/success";
import type {
  CreateTaskResponse,
  DeleteTaskResponse,
  GetPingsResponse,
  ReactivateTaskResponse,
  ServerActionReturnType,
} from "../types";
import { getUser } from "./user";

const getPulseTasks = withServerActionAsyncCatcher(
  async (): Promise<ServerActionReturnType<GetPingsResponse>> => {
    try {
      const user = await getUser();
      if (!user || !user.token) {
        return null;
      }

      const response = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/ping/getAll`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      // Backend returns: { message: string, data: { pings: PulseTask[] } }
      const backendData = response.data;
      if (!backendData.data || !backendData.data.pings) {
        console.log("Failed to fetch tasks: No data received");
        return null;
      }

      const actionResponse = new SuccessResponse<GetPingsResponse>(
        "Pings fetched successfully",
        200,
        { pings: backendData.data.pings },
      );
      return actionResponse.serialize();
    } catch (error: unknown) {
      console.error("Error fetching pings:", error);
      return null;
    }
  },
);

type AddTaskArgs = {
  url: string;
};

const addTasks = withServerActionAsyncCatcher(
  async (
    data?: AddTaskArgs,
  ): Promise<ServerActionReturnType<CreateTaskResponse>> => {
    try {
      const user = await getUser();
      if (!user || !user.token || !data) {
        return null;
      }

      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/v1/ping/create`,
        {
          url: data.url,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Backend returns: { message: string, task: PulseTask, taskID: number, url: string }
      const res = new SuccessResponse<CreateTaskResponse>(
        "Task added successfully",
        200,
        response.data,
      );
      return res.serialize();
    } catch (err: unknown) {
      console.log("Error adding task:", err);
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
        console.log("Error details:", (err.response as any).data);
      }
      return null;
    }
  },
);

const reactivateTask = withServerActionAsyncCatcher(
  async (args?: {
    taskId: number;
  }): Promise<ServerActionReturnType<ReactivateTaskResponse>> => {
    try {
      const user = await getUser();
      if (!user || !user.token || !args?.taskId) {
        return null;
      }
      const { taskId } = args;

      const response = await axios.patch(
        `${process.env.BACKEND_URL}/api/v1/ping/reactivate`,
        {
          taskID: taskId, // Backend expects taskID (capital D)
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Backend returns: { message: string, taskId: number, url: string }
      const res = new SuccessResponse<ReactivateTaskResponse>(
        "Task reactivated successfully",
        200,
        response.data,
      );
      return res.serialize();
    } catch (err: unknown) {
      console.log("Error reactivating task:", err);
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
        console.log("Error details:", (err.response as any).data);
      }
      return null;
    }
  },
);

const deleteTask = withServerActionAsyncCatcher(
  async (args?: {
    taskId: number;
  }): Promise<ServerActionReturnType<DeleteTaskResponse>> => {
    try {
      const user = await getUser();
      if (!user || !user.token || !args?.taskId) {
        return null;
      }
      const { taskId } = args;

      const response = await axios.delete(
        `${process.env.BACKEND_URL}/api/v1/ping/delete`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          data: {
            task_id: taskId, // Backend expects task_id (underscore)
          },
        },
      );

      // Backend returns: { message: string, taskID: number }
      const res = new SuccessResponse<DeleteTaskResponse>(
        "Task deleted successfully",
        200,
        response.data,
      );
      return res.serialize();
    } catch (err: unknown) {
      console.log("Error deleting task:", err);
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response) {
        console.log("Error details:", (err.response as any).data);
      }
      return null;
    }
  },
);

export { getPulseTasks, addTasks, deleteTask, reactivateTask };
