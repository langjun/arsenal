# Arsenal

Arsenal is a powerful tool for Surge Script and QuantumultX Script

## API

### fetch
> start an http request

```typescript
interface IOptions {
  url: string,
  headers?: object,
  body?: string
}

interface IResponse {
  error: string | null,
  status: number | null,
  headers: object | null,
  data: string | null
}

fetch(options: IOptions, callback: (res: IResponse) => void)
```

### localStroage
> save data permanently

```typescript
localStroage.getItem(key: string)
localStroage.setItem(key: string, value: string)
localStroage.removeItem(key: string, value: string) // just for QuantumultX
localStroage.clear() // just for QuantumultX
```

### postNotification
> post a notification

```typescript
postNotification(title: string, subtitle: string, message: string)
```

### setLoggerEnable
> log switch

```typescript
setLoggerEnable(toggle: boolean)
```

### logger
> console.log()

```typescript
logger(message: string)
```