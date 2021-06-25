import React from "react"

interface Props {
  children: React.ReactNode
}

export const NavbarPage: React.FC<Props> = ({ children }) => <div className="testingNav"> {children}</div>
