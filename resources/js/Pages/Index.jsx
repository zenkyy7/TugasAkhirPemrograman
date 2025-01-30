import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Chirper" />
            <section className="text-gray-800 h-screen flex flex-col items-center justify-center">
                <div className="container  flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-around">
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-5xl">
                            Build Chirper with{" "}
                            <span className="text-red-600">Inertia</span>{" "}
                            ReactJS
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">
                            Chirps is a demo project from{" "}
                            <a
                                href="https://bootcamp.laravel.com/inertia/installation"
                                className="text-red-600 underline"
                                target="_blank"
                            >
                                Laravel Bootcamp
                            </a>{" "}
                            that demonstrates the features and capabilities of
                            Laravel, <br />
                            and to see the full repository, you can{" "}
                            <a
                                href="https://github.com/balalii/laravel-chirps-react"
                                className="text-red-600 underline"
                                target="_blank"
                            >
                                click here
                            </a>
                            .
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link
                                href={route("login")}
                                className="px-12 py-3 text-lg font-semibold rounded bg-red-600 text-gray-50"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-12 py-2.5 text-lg font-semibold border rounded border-gray-800"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                        <img
                            src="https://c4.wallpaperflare.com/wallpaper/405/53/139/anime-one-piece-skull-skull-and-bones-wallpaper-preview.jpg"
                            alt=""
                            className="object-cover rounded-lg h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
                        />
                    </div>
                </div>
            </section>
            <footer className="text-center text-gray-600 py-3">
    Dibuat oleh Tim 🤡🤡{" "}
    <a
        href="https://github.com/Wahyu"
        className="font-bold"
        target="_blank"
        rel="noopener noreferrer"
    >
        Dion
    </a>
</footer>

        </>
    );
}
