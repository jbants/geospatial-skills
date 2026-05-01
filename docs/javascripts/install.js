// Reusable install-tab + copy logic for skill detail pages.
// Reads `data-skill` from .install root. If empty / "_repo", treat as whole-repo install.
(function () {
  document.querySelectorAll('.install').forEach(function (root) {
    var skill = root.dataset.skill || '';
    var repo = 'isaaccorley/geospatial-skills';
    var slug = skill ? repo + '/' + skill : repo;
    var skillsAdd = skill ? skill : repo;
    var pluginArg = skill ? skill + '@geospatial-skills' : 'geospatial-skills';

    var C = {
      skills: {
        html: 'npx skills add <span class="arg">' + slug + '</span>',
        text: 'npx skills add ' + slug
      },
      universal: skill
        ? { html: 'cp -R skills/<span class="arg">' + skill + '</span> ~/.agent/skills/<span class="arg">' + skill + '</span>',
            text: 'cp -R skills/' + skill + ' ~/.agent/skills/' + skill }
        : { html: 'git clone <span class="arg">https://github.com/' + repo + '</span> &amp;&amp; cp -R ' + repo.split('/')[1] + '/skills/* ~/.agent/skills/',
            text: 'git clone https://github.com/' + repo + ' && cp -R geospatial-skills/skills/* ~/.agent/skills/' },
      claude: {
        html: '/plugin install <span class="arg">' + pluginArg + '</span>',
        text: '/plugin install ' + pluginArg
      },
      cli: {
        html: 'claude plugin install <span class="arg">' + pluginArg + '</span>',
        text: 'claude plugin install ' + pluginArg
      }
    };

    var tabs = root.querySelectorAll('.tabs button');
    var cmd = root.querySelector('.cmdtext');
    var copyBtn = root.querySelector('.copy');
    if (!cmd || !copyBtn) return;

    var initial = root.dataset.default || 'skills';
    var active = C[initial] ? initial : 'skills';
    cmd.innerHTML = C[active].html;
    tabs.forEach(function (b) {
      if (b.dataset.k === active) b.classList.add('on');
      else b.classList.remove('on');
      b.onclick = function () {
        tabs.forEach(function (t) { t.classList.remove('on'); });
        b.classList.add('on');
        active = b.dataset.k;
        cmd.innerHTML = C[active].html;
      };
    });

    copyBtn.onclick = function () {
      if (navigator.clipboard) navigator.clipboard.writeText(C[active].text);
      copyBtn.classList.add('ok');
      copyBtn.textContent = 'COPIED';
      setTimeout(function () { copyBtn.classList.remove('ok'); copyBtn.textContent = 'COPY'; }, 1400);
    };
  });
})();
