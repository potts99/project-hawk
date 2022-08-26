## Installation

```sh
npm install --save logsnag
```

## Usage

### Import Library

```js
import { LogSnag } from 'logsnag';
```

### Initialize Client

```js
const logsnag = new LogSnag({ 
  token: '7f568d735724351757637b1dbf108e5',
  project: 'my-saas'
});
```

### Publish Event

```js
logsnag.publish({
    channel: "waitlist",
    event: "User Joined",
    icon: "🎉",
    tags: {
      name: "john doe",
      email: "john@example.com",
    },
    notify: true
})
```

### Publish Insight

```js
logsnag.insight({
    title: "User Count",
    value: "100",
    icon: "👨",
})
```
