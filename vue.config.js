/* eslint-disable no-param-reassign */
module.exports = {
	runtimeCompiler: true,
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: 'src/service-worker.js',
			swDest: `service-worker.js`,
		},
	},
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			config.output.filename = `js/[name].${process.env.VUE_APP_VERSION}.min.js`;
			config.output.chunkFilename = `js/[name].${process.env.VUE_APP_VERSION}.min.js`;
		} else {
			config.output.filename = 'js/[name].js';
			config.output.chunkFilename = 'js/[name].js';
		}
	},
	css: {
		extract: {
			filename: `css/[name]${process.env.NODE_ENV === 'production' ? `.${process.env.VUE_APP_VERSION}` : ''}.css`,
			chunkFilename: `css/[name]${process.env.NODE_ENV === 'production' ? `.${process.env.VUE_APP_VERSION}` : ''}.css`,
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap((options) => {
				// eslint-disable-next-line no-param-reassign
				options.transformAssetUrls = {
					img: 'src',
					image: 'xlink:href',
					'b-avatar': 'src',
					'b-img': 'src',
					'b-img-lazy': ['src', 'blank-src'],
					'b-card': 'img-src',
					'b-card-img': 'src',
					'b-card-img-lazy': ['src', 'blank-src'],
					'b-carousel-slide': 'img-src',
					'b-embed': 'src',
					'v-img': 'src',
				};
				return options;
			});
	},
};
