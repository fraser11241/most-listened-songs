import React from "react";

const LoginPage = ({ loginUrl, isTokenExpired }) => {
  const subtitle = isTokenExpired
    ? "Token expired, please login again"
    : "Login to Spotify to see your most listened tracks";

  return (
    <div className="container prose bg-base-200 h-screen max-w-full w-full">
      <div className="flex items-center h-full mx-4">
        <div className="text-center p-4 rounded-md bg-base-100 mx-auto">
          <h1 className="text-lg">{subtitle}</h1>
          <a href={loginUrl} className="btn btn-primary">
            Login
          </a>
        </div>
      </div>
    </div>
    // <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
    // 	<Box
    // 		display="flex"
    // 		justifyContent="center"
    // 		alignItems="center"
    // 		minHeight="100vh"
    // 	>
    // 		<Card sx={{ width: 1 }}>
    // 			<Box
    // 				sx={{
    // 					display: "flex",
    // 					flexDirection: "column",
    // 					alignItems: "center",
    // 					padding: 3,
    // 				}}
    // 			>
    // 				<Avatar sx={{ m: 1, bgcolor: "green" }}>
    // 					<LockOutlinedIcon />
    // 				</Avatar>
    // 				<Typography component="h1" variant="h5">
    // 					Sign In
    // 				</Typography>
    // 				<Typography component="p" variant="body" align="center">
    // 					{subtitle}
    // 				</Typography>
    // 				<Box sx={{ mt: 1 }} width="100%">
    // 					<Button
    // 						fullWidth
    // 						variant="contained"
    // 						sx={{ mt: 3, mb: 2 }}
    // 						href={loginUrl}
    // 					>
    // 						Sign In
    // 					</Button>
    // 				</Box>
    // 			</Box>
    // 		</Card>
    // 	</Box>
    // </Container>
  );
};

export default LoginPage;
