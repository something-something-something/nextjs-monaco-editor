'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function ClientSideOnly({
	children,
}: {
	children: ReactNode | ReactNode[];
}) {
	const [isServer, setIsServer] = useState(true);
	useEffect(() => {
		setIsServer(false);
	}, []);
	if (isServer) {
		return <></>;
	}
	return <>{children}</>;
}
