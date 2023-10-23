import { ReactNode } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

export default function Nav({children}: Props) {
  const {pathname} = useRouter();
  
  return (
    <nav className="flex px-10 py-5 bg-white text-black">
      <ul className="flex gap-4">
        <li>
          <Link href="/" title="Go to homepage">
            <div
              className={cx(
                { underline: pathname === "/" },
                "hover:bg-hover px-4 py-2 rounded-md"
              )}
            >
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link href="/featured" title="See Featured Pokemon">
            <div
              className={cx(
                { underline: pathname === "/featured" },
                "hover:bg-hover px-4 py-2 rounded-md"
              )}
            >
              Featured
            </div>
          </Link>
        </li>
      </ul>
      {children}
    </nav>
  );
}
