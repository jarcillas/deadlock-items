import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="px-4 min-h-screen h-fit flex flex-col items-center bg-linear-60 from-blue-900 to-cyan-900 text-slate-200">
      <Link to="/">
        <h1 className="py-4 text-4xl font-bold uppercase">Deadlock Items</h1>
      </Link>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
