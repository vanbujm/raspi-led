## Things I did

### Added tests
I believe the original library was untested due to the additional difficulty of testing a library that only works on a 
Raspberry Pi.

To address this issue, I mocked out all the file system read/writes to files in `/sys/class/leds/led0` with read/writes 
to a project local directory.
Originally I completely mocked the read/writes as I thought it would be more performant, however I ended up not 
continuing down that path because of the difficulty of changing the mocks to test things like `hasLed` which is run on 
module import. The tests run in ~2 seconds anyway so not a big deal performance-wise until the project scales in size.

I also added mutation tests as a way to protect against misleading code coverage, and to generally add assurance about the 
effectiveness of the tests.

### Changed compiler from tsc to babel
This is mainly a personal preference, but I believe babel to play nice with the rest of the NodeJs ecosystem.

### Added Eslint
Eslint is my linter of choice, this coupled with prettier (and its eslint plugin) and typescript plugins makes linting 
for; typescript errors, formatting errors, and JS errors easy. I added airbnb-core as an extension for a more opinionated 
coding style.

### Added TravisCi
TravisCi is a great CI/CD pipeline tool for open source projects, especially in the JS ecosystem where other pipelines 
often neglect support for things like npm caching. I also considered CircleCi as I have found it to often be more performant,
however, it can have problems with docker images that have arm emulation (see below)

Some things I added to the pipeline:
- Code coverage reporting
- npm package auditing
- mutation test coverage
- allowed the mutation test stage to fail as not all mutants are necessarily relevant

#### Node version testing
I "fanned-out" the testing jobs for different node versions so that the basic tests cover lts, current, and a popular old version.
I decided not to continue the fanned-out approach later on just to simplify things later on and to reduce the time taken to 
build while I was working on the pipeline.

### Git hooks
I added a few git hooks to help prevent developers from forgetting things like running tests, linting their code, and 
formatting commits. The goal here is to help reduce the feedback cycle for a developer trying to contribute to the project.

### Automatic deployment to NPM
I added semantic-release as a deploy stage to the pipeline. It combined with the commit linter, allows for automatic semantic
versioning and package deployment to npmjs.com. The deploy step is limited to only running on master (presumably after a PR).

### Arm emulated tests
This package is supposed to only be run on a Raspberry Pi, while I did mock out the tests such that the code can be run 
on any machine, I wanted to be able to run the tests on an arm emulated docker image just encase a library was ever added
 that need arm built binaries. I used a Balena image for this since it has qemu setup already (qemu is seriously a pain 
to setup >.<). 

This does have a caveat though, as the tests still don't write to `/sys/class/leds/led0` so the tests 
passing does not guarantee that the code will execute correctly on a raspberry pi. Some more advanced integration tests
 would need to be setup that could automatically be run on a pi for that to be guaranteed, I deemed this out of scope 
for this project.
