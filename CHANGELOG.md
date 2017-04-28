## Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

[1.5.0] - 2017-04-25 
--------------------
##### Added
- Ends-with() support.
- Abs() support.

##### Fixed
- Negative int() conversion incorrect.

[1.4.0] - 2017-03-07
--------------------
##### Added
- Log() and exp10 functions.

[1.3.3] - 2016-11-04
--------------------
##### Fixed
- Min() and max() get stuck in infinite loop when used with multiple nodeset arguments.

[1.3.2] - 2016-09-26
--------------------
##### Fixed
- Int() returns incorrect result for very large or very small numbers.

[1.3.1] - 2016-04-27
-------------------------
##### Fixed
- No longer working as CommonJS module.
- Some rounding errors in new tests on Travis.

[1.3.0] - 2016-04-26
-------------------------
##### Added
- Added support for 11 additional math functions.

[1.2.4] - 2016-02-02
-------------------------
##### Fixed
- Min() and max() return undefined for empty node
- Min() and max() do not return NaN for list that includes an empty node

[1.2.3] - 2015-08-25
-------------------------
##### Changed
- Added main to package.json

[1.2.2] - 2015-08-25
------------------------
##### Changed
- Turned into CommonJS/AMD-friendly module

[1.2.1] - 2015-07-10 
------------------------
##### Removed
- Obsolete files

[1.2.0] - 2015-03-17
------------------------
##### Changed
- filenames of built js files (WARNING!)

[1.1.0] - 2015-3-11
---------------------
##### Added
- everything (first 'version')
