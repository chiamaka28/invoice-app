import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools position="bottom-right" />
  </>
);

export const Route = createRootRoute({
  component: RootLayout,
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/') {
      // Cast to any because the generated route types may not include '/courses' yet.
      throw redirect({ to: '/login' as any, replace: true });
    }
  },
});
