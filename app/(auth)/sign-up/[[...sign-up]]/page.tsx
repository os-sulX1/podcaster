import { SignUp } from "@clerk/nextjs";
import React from "react";

type Props = {};

const SignUpClerk = (props: Props) => {
	return (
		<div className="flex-center glasmorphism-auth h-screen w-full">
			<SignUp />
		</div>
	);
};

export default SignUpClerk;
