import { useForm } from "@inertiajs/react";
import { Table, Button } from "flowbite-react";
import { Ban } from "lucide-react";

export default function AccountReport({ reports }) {
    const { patch, reset } = useForm({});

    const actionReport = (userId) => {
        if (confirm("Are you sure you want to banned this user?")) {
            patch(route("dashboard.admin.report.update", userId), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };
    return (
        <Table striped className="border">
            <Table.Head>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Reason</Table.HeadCell>
                <Table.HeadCell>Detail</Table.HeadCell>
                <Table.HeadCell>Reporter</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {reports.map((data) => (
                    <Table.Row
                        key={data.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                            {data.reported.email}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                            {data.reason}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                            {data.detail}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white">
                            {data.reporter.email} {`(${data.reporter.name})`}
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex space-x-2">
                                <Button
                                    color="red"
                                    size="sm"
                                    onClick={() => actionReport(data.id)}
                                >
                                    <Ban className="mr-2 h-4 w-4" />
                                    Banned
                                </Button>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}
