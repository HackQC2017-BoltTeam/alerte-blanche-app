# Alerte Blanche

## Fix Library React-router

1. Open file
`nano node_modules/react-router-native/Link.js`

2. Replace in handlePress
```const { to, replace, onPress } = this.props
if (onPress) onPress()```
