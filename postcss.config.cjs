module.exports = {
  plugins: [
    require('postcss-fixes')({ preset: 'recommended' }),
    require('postcss-preset-env')({
      stage: 3,            // уровень стабильности CSS-фич (0 — экспериментальные, 3 — почти финальные)
      autoprefixer: { grid: true },
    }),
  ],
};
