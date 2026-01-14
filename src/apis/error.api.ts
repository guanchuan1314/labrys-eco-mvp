import { postApi } from "../services/axios.service";
import { errorRequest } from "../requests/error.request";
import { errorResponse } from "../responses/error.response";

export const error = async (message: string) => {
  const sanitizedRequest = errorRequest({ message });
  const response = await postApi("/api/v1/error", sanitizedRequest);
  return errorResponse(response);
};
