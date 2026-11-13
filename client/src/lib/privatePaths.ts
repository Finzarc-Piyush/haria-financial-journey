// Pages that are private to a signed-in person: no site chrome, no cookie banner, no analytics.
export const isPrivatePath = (p: string) =>
    p === '/login' || p === '/dashboard' || p.startsWith('/userdashboard') || p.startsWith('/admindash');
