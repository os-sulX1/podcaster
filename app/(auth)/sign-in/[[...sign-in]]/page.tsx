import { SignIn } from "@clerk/nextjs";
import React from "react";

type Props = {};

const SignInClerk = (props: Props) => {
	return (
		<div className="flex-center glasmorphism-auth h-screen w-full">
			<SignIn />
		</div>
	);
};

export default SignInClerk;
