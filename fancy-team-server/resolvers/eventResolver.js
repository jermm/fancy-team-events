"use strict";
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const { Client } = require('pg');
const client = new Client();
const cors = require('cors');
//# sourceMappingURL=eventResolver.js.map