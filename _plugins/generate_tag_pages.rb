# Generate tag pages for Jekyll site
Jekyll::Hooks.register :site, :post_read do |site|
  all_tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.uniq

  all_tags.each do |tag|
    # Create output directory if it doesn't exist
    tag_dir = File.join(site.source, 'tags', tag.downcase.gsub(/\s+/, '-'))
    FileUtils.mkdir_p(tag_dir)

    # Create index.md for the tag
    tag_page_content = <<~CONTENT
      ---
      layout: tag
      tag: #{tag}
      permalink: /tags/{{ page.tag | downcase | replace: ' ', '-' }}/
      ---
    CONTENT

    tag_page_path = File.join(tag_dir, 'index.md')
    unless File.exist?(tag_page_path)
      File.write(tag_page_path, tag_page_content)
    end
  end
end
