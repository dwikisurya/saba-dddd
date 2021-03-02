const router = require('express').Router()
const userRoutes = require('./user')
const taskRoutes = require('./task')
const uploadRoutes = require('./upload')
const proyekRoutes = require('./proyek')

// Send Homepage
router.get('/', (req, res) => {
    res.send('homepage')
})

// Mutler Storage

// Route
router.use('/auth', userRoutes)
router.use('/task', taskRoutes)
router.use('/upload', uploadRoutes)
router.use('/proyek', proyekRoutes)

module.exports = router