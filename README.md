# SkillPies.com Test Reporting

Reports the Github Classroom test results to SkillPies.com

## Inputs

### `courseId`

**Required** UrlId of the course for the solution to report.

### `sectionId`

**Required** UrlId of the section for the solution to report.

### `testResult`

**Required** Test result from the Github Classroom

## Example usage

```yaml

---
- name: Test with Vitest
  id: npm
  uses: education/autograding-command-grader@v1
  continue-on-error: true # report also failed tests
  with:
    test-name: NPM
    setup-command: pnpm install
    command: pnpm test -- run
    timeout: 10
    max-score: 1
- name: Autograding Reporter
  uses: education/autograding-grading-reporter@v1
  env:
    NPM_RESULTS: "${{steps.npm.outputs.result}}"
  with:
    runners: npm
- name: Report to SkillPies
  if: always() # run on failed tests as well
  uses: tomitrescak/skillpies-reporting
  with:
    courseId: my-course,
    sectionId: my-section,
    testResult: ${{steps.npm.outputs.result}}
```
