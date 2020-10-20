import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import { map } from "lodash";

// theme
import theme from "./project.theme";

// routes
import routes from "./client/routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Switch>
          {map(routes, (route, idx) => {
            return <Route {...route} key={idx} />;
          })}
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
