<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// echo '<pre>';
// var_dump($attributes);
// echo '</pre>';
// echo $content;

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'smm-item ' . (
        $attributes['megaMenuWidth'] === '100vw'
            ? 'has-viewport-width'
            : ($attributes['megaMenuWidth'] === '100%'
                ? 'has-100percent-width'
                : (strpos($attributes['megaMenuWidth'], 'px') !== false
                    ? 'has-custom-width'
                    : ''))
    )
]);

$title_style = '';
if (!empty($attributes['titlePadding'])) {
    $padding = $attributes['titlePadding'];
    $title_style .= sprintf(
        'padding: %s %s %s %s;',
        $padding['top'] ?? '0',
        $padding['right'] ?? '0',
        $padding['bottom'] ?? '0',
        $padding['left'] ?? '0'
    );
}
if (!empty($attributes['fontSize']['size'])) {
    $title_style .= sprintf('font-size: %s;', $attributes['fontSize']['size']);
}

$checkbox_id = 'mega-menu-' . ($attributes['id'] ?? uniqid());
?>

<li <?php echo $wrapper_attributes; ?>
    style="--mega-menu-width: <?php echo esc_attr($attributes['megaMenuWidth'] ?? '100vw'); ?>;
           --mega-menu-left: <?php echo esc_attr($attributes['megaMenuLeft'] ?? '0px'); ?>;">
    <label for="<?php echo esc_attr($checkbox_id); ?>"
           class="mega-menu-item__title"
           style="<?php echo esc_attr($title_style); ?>">
        <input type="checkbox" id="<?php echo esc_attr($checkbox_id); ?>" />
        <?php echo wp_kses_post($attributes['menuName'] ?? ''); ?>
    </label>
    <?php echo $content; ?>
</li>
