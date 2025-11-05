---
layout: default
title: Home
---

<div class="home">
  <h1>Hi 👋, I'm NissonCX</h1>

  <p>
    🎓 Computer Science @ Chongqing University<br>
    🔧 Focused on <strong>Backend Development</strong> and <strong>Distributed Systems</strong><br>
    💡 Passionate about clean code, system design, and algorithmic thinking
  </p>

  <h2>🛠️ Tech Stack</h2>
  <p>
    Java • Spring Boot • C++ • MySQL • Redis • Kafka • Docker • Git
  </p>

  <h2>📬 Connect</h2>
  <ul class="social-links">
    <li><a href="https://github.com/NissonCX">GitHub</a></li>
    <li><a href="https://blog.csdn.net/2301_82028135">CSDN Blog</a></li>
    <li><a href="mailto:2144546224@qq.com">Email (QQ)</a></li>
  </ul>

  <h2>📝 Latest Posts</h2>
  <ul class="post-list">
    {% for post in site.posts limit:5 %}
      <li>
        <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>

  <p><a href="/posts/">View all posts →</a></p>
</div>

<style>
.home {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}
.social-links, .post-list {
  list-style: none;
  padding: 0;
}
.social-links li, .post-list li {
  display: inline-block;
  margin-right: 15px;
}
.post-meta {
  color: #666;
  font-size: 0.9em;
}
</style>
