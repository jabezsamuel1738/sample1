import Crashes, {ExceptionModel} from 'appcenter-crashes';

export const exceptionLogger = async (error: any) => {
  const exceptionModel = ExceptionModel.createFromError(error as Error);
  Crashes.trackError(exceptionModel, undefined, undefined);
};
