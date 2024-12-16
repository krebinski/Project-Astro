/* Configuração do dashboard */
export const dashboardConfig = {
    title: "Astro Bot",
    url: "https://localhost",
    logo: "/assets/logo.png",
    description: "Astro Bot Dashboard",
    image: "/opengraph-image",
};

// Redirecionamento do dashboard
export const dashboardRedirects = [
    {
        source: "/discord",
        destination: "https://discord.com/invite/krebinski",
        permanent: true,
    },
    {
        source: "/invite",
        destination: "/api/invite",
        permanent: true,
    },
    {
        source: "/support",
        destination: "/discord",
        permanent: true,
    },
    {
        source: "/contact",
        destination: "/discord",
        permanent: true,
    },
    {
        source: "/server",
        destination: "/discord",
        permanent: true,
    },
    {
        source: "/status",
        destination: "https://status.majoexe.xyz",
        permanent: true,
    },
];

// Dashboard headers