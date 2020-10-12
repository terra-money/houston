import ExtendableError from "extendable-error";

class HoustonError extends ExtendableError {
  constructor(message: string, public code: number) {
    super(message);
  }
}

export default HoustonError;
