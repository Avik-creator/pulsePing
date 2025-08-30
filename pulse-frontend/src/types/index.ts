type PulseLog = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  taskId: number;
  time: string;
  timeTake: number;
  logResponse: string;
  isSuccess: boolean;
  respCode: number;
};

type PulseTask = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt?: string;
  url: string;
  isActive: boolean;
  notifyEmail: boolean;
  userId: number;
  logs: PulseLog[];
  failCount: number;
};

// API Response Types
type ApiResponse<T = unknown> = {
  message: string;
  data?: T;
  error?: string;
  details?: string;
};

type TAxiosResponse<T = unknown> = {
  message: string;
  additional?: T;
  data?: T;
};

type ServerActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
};

type ServerActionReturnType<T = unknown> = ServerActionResponse<T> | null;

// Backend Response Types
type GetPingsResponse = {
  pings: PulseTask[];
};

type CreateTaskResponse = {
  message: string;
  task: PulseTask;
  taskID: number;
  url: string;
};

type ReactivateTaskResponse = {
  message: string;
  taskId: number;
  url: string;
};

type DeleteTaskResponse = {
  message: string;
  taskID: number;
};

export type {
  PulseLog,
  PulseTask,
  ApiResponse,
  TAxiosResponse,
  ServerActionResponse,
  ServerActionReturnType,
  GetPingsResponse,
  CreateTaskResponse,
  ReactivateTaskResponse,
  DeleteTaskResponse,
};
