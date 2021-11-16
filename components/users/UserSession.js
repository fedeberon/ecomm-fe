import {signOut, useSession} from "next-auth/client"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faUserCircle} from "@fortawesome/free-solid-svg-icons";

const UserSession = () => {
        const [session, loading] = useSession()

    if (session) {
        return (
                <>
                    <a className="relative" onClick={signOut} aria-label="user.name">
                        <p>{session.user.name}</p>
                        <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faArrowRight} />
                    </a>
                </>
        )
    } else {
        return (
                <Link href="/api/auth/signin">
                    <a className="relative" aria-label="login">
                        <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faUserCircle} />
                    </a>
                </Link>
        )
    }
}

export default UserSession