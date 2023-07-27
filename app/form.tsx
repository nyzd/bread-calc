"use client";

import Button from "./(components)/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Form() {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [path, setPath] = useState("");
    const [month, setMonth] = useState("");
    const router = useRouter();

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (path !== "" && month !== "") {
            setDisabled(true);
            router.push(`/repo/${path}/${month}`);
        }
    };

    const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) setDisabled(false);
        setPath(e.target.value);
    }

    const handleMonthInputChange = (e: ChangeEvent<HTMLInputElement>) =>
        setMonth(e.target.value);

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Repository URL"
                onChange={handleTextInputChange}
            />
            <input type="month" name="x" id="" onChange={handleMonthInputChange} />

            <Button disabled={disabled}>
                <h3>Calculate</h3>
            </Button>
        </form>
    );
}
