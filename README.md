# mongotail

CLI to tail any capped MongoDB collection - like oplog

[![Build status](https://travis-ci.org/watson/mongotail.svg?branch=master)](https://travis-ci.org/watson/mongotail)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

## Installation

```
npm install mongotail -g
```

## Usage

```
mongotail [options] [database]
```

**Options:**

- `--database <database>` or `-d <database>` - Specifies the database
  name

- `--collection <collection>` or `-c <collection>` - Specifies the
  collection to tail. If not specified, the oplog will be tailed

- `--username <username>` or `-u <username>` - Specifies a username to
  authenticate to the MongoDB instance

- `--password <password>` or `-p <password>` - Specifies a password to
  authenticate to the MongoDB instance. If provided without a value,
  you'll be promted to enter a password manually

- `--host <hostname>` - Specifies the host where the mongod or mongos is
  running to connect to as `<hostname>`. Defaults to `localhost`

- `--port <port>` - Specifies the port where the mongod or mongos
  instance is listening. Defaults to `27017` which is the default
  MongoDB port

- `--pretty` - Pretty print the output

Just as with the regular `mongo` client, you can seed `mongotail` with a
[MongoDB connection
string](http://docs.mongodb.org/manual/reference/connection-string/),
e.g:

```
mongotail myserver/mycollection
```

You can of cause mix with options:

```
mongotail myserver/mycollection -u admin -p
```

### Example: Tailing oplog

Given a replica set hosted on `example.net` with a master on port 10000
and a slave on port 10001, you could tail the oplog like so (given that
`myuser` have permissions to access the oplog):

```
mongotail example.net:10000,example.net:10001/mydb -u myuser -p
```

Notice how we do not specify a collection. This will make mongotail fall
back to using the special `oplog.rs` collection.

## License

MIT
