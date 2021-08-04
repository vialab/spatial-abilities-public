var gulp = require("gulp");
var browserify = require("browserify");
var watchify = require("watchify");
var browserSync = require('browser-sync').create();
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

var {createProxyMiddleware} = require('http-proxy-middleware');

const DIST_JS_DEST = "build";
const DEBUG_JS_DEST = "./src";

var sources = {
  pages: ["src/*.html"],
  css: ["src/css/*.css"],
  images: ["src/images/**/*.*"]
};

gulp.task("copy-html", function CopyHtml()
{
	return gulp
		.src(sources.pages)
		.pipe(gulp.dest("build"))
		.pipe(browserSync.stream())
		;
});

gulp.task("copy-css", function CopyCss()
{
	return gulp
		.src(sources.css)
		.pipe(gulp.dest("build/css"))
		.pipe(browserSync.stream())
		;
});

gulp.task("dist-js", BuildDist)

gulp.task(
	"build-js",
	BuildJs
);

gulp.task("copy-images", function CopyImages()
{
	return gulp
	.src(sources.images)
	.pipe(gulp.dest("build/images"))
	.pipe(browserSync.stream())
	;
});

gulp.task("copy-dependencies", function CopyDependencies()
{
	return gulp.src("src/external/**/*.*")
		.pipe(gulp.dest("build/external"))
		.pipe(browserSync.stream())
		;
});

gulp.task(
	"default",
	gulp.parallel([
		"copy-html",
		"copy-css",
		"copy-images",
		"copy-dependencies",
		"dist-js"
	])
);

gulp.task("sync-html", function SyncHtml()
{
	return gulp
		.src(sources.pages)
		.pipe(browserSync.stream());
});

gulp.task("sync-css", function SyncCss()
{
	return gulp
		.src(sources.css)
		.pipe(browserSync.stream());
});

gulp.task("watch", gulp.series(
	gulp.parallel(
		"sync-html",
		"sync-css",
		WatchJs
	),
	function Watch(done)
	{
		var proxy = createProxyMiddleware('/api', {target: 'http://localhost:8080'})

		browserSync.init({
			server: "./src",
			port: 3000,
			middleware: [proxy],
		});

		gulp.watch("src/css/*.css", gulp.series("sync-css"));
		gulp.watch("src/*.html", gulp.series("sync-html"));
		gulp.watch("src/images/**/*.*", browserSync.reload);
		gulp.watch("src/bundle.js")
			.on("change", browserSync.reload);

		done();
	}
));

function WatchJs()
{
	var browserifyPipe =
		BrowserifyInstance()
		.plugin(watchify);

	browserifyPipe.on("update", gulp.series(
		function Rebuild()
		{
			return Bundle(browserifyPipe, DEBUG_JS_DEST).pipe(gulp.dest(DEBUG_JS_DEST));
		}
	));

	return Bundle(browserifyPipe, DEBUG_JS_DEST).pipe(gulp.dest(DEBUG_JS_DEST));
}

function DistJs(destination)
{
	let bf = BrowserifyInstance();
	return Bundle(bf, destination)
		// .pipe(uglify())
		.pipe(gulp.dest(destination));

}

function BuildJsToDest(destination)
{
	return Bundle(BrowserifyInstance(), destination)
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest(destination));
}

function BrowserifyInstance()
{
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["src/js/Main.ts"],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify);
}

function Bundle(browserifyPipeline)
{
	return browserifyPipeline
		.bundle()
		.on("error", (err) =>
		{
			console.error(err.message);
		})
		.pipe(source("./bundle.js"))
		.pipe(buffer())
}

function BuildDist()
{
	return DistJs(DIST_JS_DEST);
}

function BuildJs()
{
	return BuildJsToDest(DIST_JS_DEST);
}