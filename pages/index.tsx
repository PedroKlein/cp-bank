import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import getRandomEmoji from "../utils/randomEmoji.utils";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") return <main className="center" aria-busy />;

  if (status === "unauthenticated") {
    return (
      <main className="center">
        <section>
          <hgroup>
            <h2>{`Welcome to CP Bank!`}</h2>
            <h3>Please login</h3>
          </hgroup>

          <Link href="/api/auth/signin" role="button">
            Log in
          </Link>
        </section>
      </main>
    );
  }

  // return (
  //   <main className="center">
  //     <section>
  //       <hgroup>
  //         <h2>{`Welcome ${session.user.name} ${getRandomEmoji()}`}</h2>
  //         <h3>Enjoy CP Bank </h3>
  //       </hgroup>
  //     </section>
  //   </main>
  // );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" color="primary">
          Material UI v5 with Next.js in TypeScript
        </Typography>
        <Typography component="h2" color="secondary">
          Boilerplate for building faster.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
