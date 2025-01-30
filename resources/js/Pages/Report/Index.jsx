import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Tabs } from "flowbite-react";
import { Bird, CircleUserRound } from "lucide-react";
import AccountReport from "./AccountReport";
import ChripsReport from "./ChripsReport";

export default function Index({ auth, reports }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Report Management" />

            <div className="px-10 bg-white min-h-screen ">
                <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7">
                    <div className="overflow-x-auto pt-5 px-1">
                        <Tabs aria-label="Full width tabs">
                            <Tabs.Item active title="Chirps report" icon={Bird}>
                                <ChripsReport
                                    reports={reports.filter(
                                        (data) => !data.reported.email
                                    )}
                                />
                            </Tabs.Item>
                            <Tabs.Item
                                title="Account report"
                                icon={CircleUserRound}
                            >
                                <AccountReport
                                    reports={reports.filter(
                                        (data) => !!data.reported.email
                                    )}
                                />
                            </Tabs.Item>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
