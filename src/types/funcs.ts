export type WorkerMethod = string;

export interface WorkerParams {
  [key: string]: any;
}
export interface WorkerOutput {
  result: any;
  status: boolean;
  message: string;
}

export type WorkerFunc = (
  method: WorkerMethod,
  params?: WorkerParams,
) => WorkerOutput;
