import { setJestCucumberConfiguration } from "jest-cucumber";

setJestCucumberConfiguration({
  errors: {
    missingScenarioInFeature: true,
    missingScenarioInStepDefinitions: true,
    missingStepInStepDefinitions: true,
    missingStepInFeature: true,
  },
  loadRelativePath: true,
});
