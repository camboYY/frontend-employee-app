import Navbar from "./navbar";
import React from "react";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container-fluid mx-5">{children}</main>
      <Footer />
    </div>
  );
}
