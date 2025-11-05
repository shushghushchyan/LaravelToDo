import React from "react";
import { Head, useForm, router } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/register", {
            onSuccess: () => router.visit("/login"),
        });
    };

    return (
        <div>
            <Head title="Register" />
            <form onSubmit={submit}>
                <div style={{ marginBottom: 10 }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        className="block w-full mt-1"
                    />
                    {errors.name && (
                        <div style={{ color: "crimson", fontSize: 12 }}>
                            {errors.name}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        className="block w-full mt-1"
                    />
                    {errors.email && (
                        <div style={{ color: "crimson", fontSize: 12 }}>
                            {errors.email}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <div style={{ color: "crimson", fontSize: 12 }}>
                            {errors.password}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: 10 }}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                        className="block w-full mt-1"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <div style={{ color: "crimson", fontSize: 12 }}>
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    style={{ marginTop: 10 }}
                >
                    {processing ? "Registering…" : "Register"}
                </button>
                <div 
                className="loginRedirect"
                style={{ marginTop: 15 }}>
                    <span>Already have an account? </span>
                    <button
                        type="button"
                        onClick={() => router.visit("/login")}
                        className='redirect'
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
}
