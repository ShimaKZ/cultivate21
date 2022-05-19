const Koa = require('koa');
const Router = require('koa-router');
const staticfile = require('koa-static')
const bodyParser = require('koa-body')
const db = require('./config.local.js').db
const Sequelize = require('sequelize');
console.log(db)
const router = new Router();


let sequelize = new Sequelize(db.database, db.user, db.password, {
	host: db.host,
	dialect: db.dialect,
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

var Member = sequelize.define('cultivate21', {
	name: Sequelize.STRING(20),
	number: Sequelize.STRING(20),
    department:Sequelize.STRING(20),
	qq: Sequelize.STRING(20),
    dorm: Sequelize.STRING(30),
	tele: Sequelize.STRING(20),
    hope: Sequelize.STRING(500)
}, {
	timestamps: false,
	freezeTableName: true
});

Member.sync()

let app = new Koa()

app.use(bodyParser())
app.use(staticfile('public'))

router.post('/submit', async (ctx, next) => {
	let mem=ctx.request.body
    console.log(mem);
    Member.create({
        name: mem.name,
        number: mem.number,
        department:mem.department,
        qq: mem.qq,
        dorm: mem.dorm,
        tele: mem.tele,
        hope:mem.hope
    });
	console.log(ctx.request.body)
	ctx.body = 'success';
});

app.use(router.routes())
app.listen(8001);

