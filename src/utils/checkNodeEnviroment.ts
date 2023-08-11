const checkNodeEnvironment = (productionExpression: string, developmentExpression: string) =>
  process.env.NODE_ENV === "production" ? productionExpression : developmentExpression;

export default checkNodeEnvironment;