export const appConfig = {
  backendDomain:
    (process.env.NEXT_PUBLIC_SPRING_DOMAIN as string) ||
    "spring-domain-not-found",
};
