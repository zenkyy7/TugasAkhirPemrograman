import React, { useState } from "react";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { MessageCircleWarning, CircleUserRound } from "lucide-react";
import { useForm } from "@inertiajs/react";

const ReportModal = ({ type, targetId, userId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, reset, processing } = useForm({
        reason: "",
        detail: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint =
            type === "chirp"
                ? route("chirps.report", targetId)
                : route("user.report", targetId);

        post(endpoint, {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    };

    const handleModalClick = (e) => {
        // Menghentikan event bubbling pada modal content
        e.stopPropagation();
    };

    return (
        <>
            <button
                className="w-full flex items-center text-red-600 px-4 py-2 text-left text-sm leading-5 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleClick}
            >
                {type === "chirp" ? (
                    <MessageCircleWarning size={25} className="pr-2" />
                ) : (
                    <CircleUserRound size={25} className="pr-2" />
                )}
                Report {type}
            </button>

            <Modal
                show={isOpen}
                onClose={() => setIsOpen(false)}
                position="center"
                dismissible
                onClick={handleModalClick}
            >
                <div onClick={handleModalClick}>
                    <Modal.Header className="border-b border-gray-200">
                        Report {type === "chirp" ? "Message" : "User"}
                    </Modal.Header>
                    <form onSubmit={handleSubmit} onClick={handleModalClick}>
                        <Modal.Body>
                            <div className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="reason"
                                        value="Reason for reporting"
                                    />
                                    <TextInput
                                        id="reason"
                                        type="text"
                                        placeholder="Enter the reason"
                                        value={data.reason}
                                        onChange={(e) =>
                                            setData("reason", e.target.value)
                                        }
                                        required
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="detail"
                                        value="Additional details"
                                    />
                                    <Textarea
                                        id="detail"
                                        placeholder="Provide more information about the report"
                                        rows={4}
                                        value={data.detail}
                                        onChange={(e) =>
                                            setData("detail", e.target.value)
                                        }
                                        required
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-t border-gray-200">
                            <div className="flex justify-end gap-2 w-full">
                                <Button
                                    color="gray"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="red"
                                    disabled={processing}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Submit Report
                                </Button>
                            </div>
                        </Modal.Footer>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default ReportModal;
