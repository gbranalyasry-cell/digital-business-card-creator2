(function(){
      // Template definitions with different colors for each template
      const templates = [
        {id:1, class:'t1', desc:'Clean & Warm', bg:'linear-gradient(135deg, #fff6f0, #fff)', primary: '#6e44ff', secondary: '#00e5ff'},
        {id:2, class:'t2', desc:'Modern Simple', bg:'linear-gradient(135deg, #f0fff4, #fff)', primary: '#4caf50', secondary: '#8bc34a'},
        {id:3, class:'t3', desc:'Corporate', bg:'linear-gradient(135deg, #f0f8ff, #fff)', primary: '#2196f3', secondary: '#03a9f4'},
        {id:4, class:'t4', desc:'Formal', bg:'linear-gradient(135deg, #f5f0ff, #fff)', primary: '#673ab7', secondary: '#9c27b0'},
        {id:5, class:'t5', desc:'Creative', bg:'linear-gradient(135deg, #fff0f5, #fff)', primary: '#e91e63', secondary: '#f44336'},
        {id:6, class:'t6', desc:'Shiny', bg:'linear-gradient(135deg, #f0fff0, #fff)', primary: '#00bcd4', secondary: '#009688'},
        {id:7, class:'t7', desc:'Elegant', bg:'linear-gradient(135deg, #fffce6, #fff)', primary: '#ff9800', secondary: '#ffc107'},
        {id:8, class:'t8', desc:'Colorful', bg:'linear-gradient(135deg, #e6f7ff, #fff)', primary: '#00bcd4', secondary: '#ff5722'},
        {id:9, class:'t9', desc:'Classic', bg:'linear-gradient(135deg, #f9f2ff, #fff)', primary: '#3f51b5', secondary: '#607d8b'},
        {id:10, class:'t10', desc:'Unique', bg:'linear-gradient(135deg, #ffe6e6, #fff)', primary: '#f44336', secondary: '#ff5722'}
      ];

      // DOM Elements
      const templateList = document.getElementById('templateList');
      const templateSelect = document.getElementById('templateSelect');
      const card = document.getElementById('cardPreview');
      const nameInput = document.getElementById('nameInput');
      const roleInput = document.getElementById('roleInput');
      const emailInput = document.getElementById('emailInput');
      const phoneInput = document.getElementById('phoneInput');
      const namePreview = document.getElementById('namePreview');
      const rolePreview = document.getElementById('rolePreview');
      const emailPreview = document.getElementById('emailPreview');
      const phonePreview = document.getElementById('phonePreview');
      const logoInput = document.getElementById('logoInput');
      const logoPreview = document.getElementById('logoPreview');
      const accentColor = document.getElementById('accentColor');
      const bgInput = document.getElementById('bgInput');
      const downloadPng = document.getElementById('downloadPng');
      const downloadJpg = document.getElementById('downloadJpg');
      const downloadPdf = document.getElementById('downloadPdf');
      const saveDesignBtn = document.getElementById('saveDesign');
      const savedList = document.getElementById('savedList');
      const resetBtn = document.getElementById('resetBtn');
      const clearAll = document.getElementById('clearAll');
      const tagLabel = document.getElementById('tagLabel');
      const infoBlock = document.getElementById('infoBlock');
      const webLabel = document.getElementById('webLabel');
      const toggleGridBtn = document.getElementById('toggleGrid');
      const bgColor1 = document.getElementById('bgColor1');
      const bgColor2 = document.getElementById('bgColor2');
      const bgColorPreview = document.getElementById('bgColorPreview');
      const bgTypeButtons = document.querySelectorAll('.bg-type-btn');
      
      // New QR Code Elements
      const toggleQrBtn = document.getElementById('toggleQr');
      const qrCodeContainer = document.getElementById('qrCodeContainer');
      const qrSettings = document.getElementById('qrSettings');
      const qrColor = document.getElementById('qrColor');
      const qrBgColor = document.getElementById('qrBgColor');
      const qrSize = document.getElementById('qrSize');
      const qrSizeValue = document.getElementById('qrSizeValue');
      const qrColorPreview = document.getElementById('qrColorPreview');
      const qrBgColorPreview = document.getElementById('qrBgColorPreview');

      // ===== Enhanced QR Code Variables =====
      let qrCode = null;
      let qrCodeVisible = false;
      let currentQrStyle = 'modern';
      let currentQrPosition = 'bottom-right';

      // Create template previews
      templates.forEach(t => {
        const el = document.createElement('div');
        el.className = 'tmpl';
        el.dataset.id = t.id;
        el.innerHTML = `
          <div class="thumb" style="background: linear-gradient(135deg, ${t.primary}, ${t.secondary})">
            <div class="thumb-content">
              <div style="font-size: 24px; margin-bottom: 5px;">${t.id}</div>
              <div style="font-size: 12px;">${t.desc}</div>
            </div>
          </div>
          <div class="tmpl-name">Template ${t.id}</div>
        `;
        el.addEventListener('click', () => selectTemplate(t.id));
        templateList.appendChild(el);
      });

      // Select Template
      function selectTemplate(id) {
        templates.forEach(t => card.classList.remove(t.class));
        const t = templates.find(x => x.id === id);
        if (!t) return;
        
        card.classList.add(t.class);
        card.style.background = t.bg;
        card.dataset.template = id;
        templateSelect.value = id;
        
        // Update element colors based on template
        updateCardColors(t.primary, t.secondary);
        
        document.querySelectorAll('.tmpl').forEach(n => {
          n.classList.toggle('selected', Number(n.dataset.id) === id);
        });
      }

      // Update all card colors
      function updateCardColors(primary, secondary) {
        // Update text and element colors
        tagLabel.style.color = primary;
        webLabel.style.color = primary;
        rolePreview.style.color = primary;
        
        // Update logo color
        logoPreview.style.background = `linear-gradient(135deg, ${primary}, ${secondary})`;
        
        // Update gradient colors in CSS if needed
        document.documentElement.style.setProperty('--primary', primary);
        document.documentElement.style.setProperty('--secondary', secondary);
      }

      // Update colors when color picker changes
      accentColor.addEventListener('input', () => {
        const primaryColor = accentColor.value;
        // Automatically generate secondary color based on primary color
        const secondaryColor = generateComplementaryColor(primaryColor);
        
        // Update card colors
        updateCardColors(primaryColor, secondaryColor);
      });

      // Helper function to generate complementary secondary color
      function generateComplementaryColor(hex) {
        // Convert HEX to RGB
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        
        // Create complementary color
        r = (255 - r).toString(16).padStart(2, '0');
        g = (255 - g).toString(16).padStart(2, '0');
        b = (255 - b).toString(16).padStart(2, '0');
        
        return `#${r}${g}${b}`;
      }

      // Initial setup
      selectTemplate(1);

      // Sync inputs with preview
      nameInput.addEventListener('input', () => {
        namePreview.textContent = nameInput.value || 'Full Name';
        updateQrCode();
      });
      roleInput.addEventListener('input', () => {
        rolePreview.textContent = roleInput.value || 'Job Title';
        updateQrCode();
      });
      emailInput.addEventListener('input', () => {
        emailPreview.textContent = emailInput.value || 'email@example.com';
        updateQrCode();
      });
      phoneInput.addEventListener('input', () => {
        phonePreview.textContent = phoneInput.value || '+966 5X XXX XXXX';
        updateQrCode();
      });
      
      templateSelect.addEventListener('change', () => selectTemplate(Number(templateSelect.value)));

      // Logo upload
      logoInput.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
          const img = new Image();
          img.onload = function() {
            logoPreview.innerHTML = '';
            logoPreview.style.background = 'transparent';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '12px';
            logoPreview.appendChild(img);
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(f);
      });

      // Custom background input
      bgInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const v = bgInput.value.trim();
          card.style.background = v ? `url(${v}) center/cover no-repeat` : '';
        }
      });

      // Reset
      resetBtn.addEventListener('click', () => {
        nameInput.value = 'Full Name';
        roleInput.value = 'Job Title';
        emailInput.value = 'email@example.com';
        phoneInput.value = '+966 5X XXX XXXX';
        nameInput.dispatchEvent(new Event('input'));
        roleInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        phoneInput.dispatchEvent(new Event('input'));
        logoPreview.innerHTML = 'LC';
        accentColor.value = '#6e44ff';
        card.style.background = templates[0].bg;
        selectTemplate(1);
        bgInput.value = '';
        bgColor1.value = '#ffffff';
        bgColor2.value = '#6e44ff';
        updateBackgroundColor();
        
        // Reset QR Code
        if (qrCodeVisible) {
          toggleQrCode();
        }
      });

      // Card background color control
      let currentBgType = 'solid';
      
      // Toggle background type (solid / gradient)
      bgTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          bgTypeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentBgType = btn.dataset.type;
          
          if (currentBgType === 'gradient') {
            bgColor2.style.display = 'block';
          } else {
            bgColor2.style.display = 'none';
          }
          
          updateBackgroundColor();
        });
      });
      
      // Update background color when colors change
      bgColor1.addEventListener('input', updateBackgroundColor);
      bgColor2.addEventListener('input', updateBackgroundColor);
      
      // Function to update card background color
      function updateBackgroundColor() {
        if (currentBgType === 'solid') {
          card.style.background = bgColor1.value;
          bgColorPreview.style.background = bgColor1.value;
        } else {
          const gradient = `linear-gradient(135deg, ${bgColor1.value}, ${bgColor2.value})`;
          card.style.background = gradient;
          bgColorPreview.style.background = gradient;
        }
      }
      
      // Initialize background color
      updateBackgroundColor();

      // Capture card image
      async function captureCard(scale = 3) {
        const canvas = await html2canvas(card, {
          scale: scale,
          useCORS: true,
          backgroundColor: null
        });
        return canvas;
      }

      // Download images
      downloadPng.addEventListener('click', async () => {
        try {
          const canvas = await captureCard(3);
          const data = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = data;
          a.download = 'business-card.png';
          a.click();
        } catch(e) {
          alert('Export Error: ' + e.message);
        }
      });

      downloadJpg.addEventListener('click', async () => {
        try {
          const canvas = await captureCard(3);
          const data = canvas.toDataURL('image/jpeg', 0.92);
          const a = document.createElement('a');
          a.href = data;
          a.download = 'business-card.jpg';
          a.click();
        } catch(e) {
          alert('Export Error: ' + e.message);
        }
      });

      downloadPdf.addEventListener('click', async () => {
        try {
          const canvas = await captureCard(3);
          const imgData = canvas.toDataURL('image/png');
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save('business-card.pdf');
        } catch(e) {
          alert('Export Error: ' + e.message);
        }
      });

      // Save design
      async function saveDesign() {
        const canvas = await captureCard(2);
        const thumb = canvas.toDataURL('image/png');
        const list = JSON.parse(localStorage.getItem('bc_saved') || '[]');
        const obj = {
          template: Number(card.dataset.template) || 1,
          name: nameInput.value,
          role: roleInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          accent: accentColor.value,
          bg: card.style.background,
          bgType: currentBgType,
          bgColor1: bgColor1.value,
          bgColor2: bgColor2.value,
          logo: (logoPreview.querySelector('img') ? logoPreview.querySelector('img').src : ''),
          thumb,
          timestamp: Date.now(),
          // New QR Code settings
          qrVisible: qrCodeVisible,
          qrStyle: currentQrStyle,
          qrPosition: currentQrPosition,
          qrCustomPosition: {
            x: qrCodeContainer.getAttribute('data-x') || 0,
            y: qrCodeContainer.getAttribute('data-y') || 0
          },
          qrColor: qrColor.value,
          qrBgColor: qrBgColor.value,
          qrSize: qrCodeContainer.style.width
        };
        list.unshift(obj);
        localStorage.setItem('bc_saved', JSON.stringify(list.slice(0, 30)));
        renderSaved();
        alert('Design saved successfully ✅');
      }

      saveDesignBtn.addEventListener('click', saveDesign);

      // Display saved designs
      function renderSaved() {
        const list = JSON.parse(localStorage.getItem('bc_saved') || '[]');
        savedList.innerHTML = '';
        if (!list.length) {
          savedList.innerHTML = '<div style="padding: 12px; text-align: center; color: var(--text-light)">No saved designs yet</div>';
          return;
        }
        list.forEach((it, idx) => {
          const el = document.createElement('div');
          el.className = 'save-item';
          el.innerHTML = `
            <div class="save-info">
              <strong>${it.name || 'Design ' + (idx + 1)}</strong>
              <div class="muted">Template ${it.template} — ${new Date(it.timestamp).toLocaleString()}</div>
            </div>
            <div class="save-actions">
              <button class="icon-btn" title="Load Design" onclick="loadDesign(${idx})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </button>
              <button class="icon-btn" title="Delete Design" onclick="deleteDesign(${idx})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          `;
          savedList.appendChild(el);
        });
      }

      // Delete design
      function deleteDesign(idx) {
        let list = JSON.parse(localStorage.getItem('bc_saved') || '[]');
        list.splice(idx, 1);
        localStorage.setItem('bc_saved', JSON.stringify(list));
        renderSaved();
      }

      // Load design
      function loadDesign(idx) {
        const list = JSON.parse(localStorage.getItem('bc_saved') || '[]');
        if (!list[idx]) return;
        const it = list[idx];
        selectTemplate(it.template || 1);
        nameInput.value = it.name || '';
        roleInput.value = it.role || '';
        emailInput.value = it.email || '';
        phoneInput.value = it.phone || '';
        nameInput.dispatchEvent(new Event('input'));
        roleInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        phoneInput.dispatchEvent(new Event('input'));
        accentColor.value = it.accent || '#6e44ff';
        
        // Load background settings
        if (it.bg) {
          card.style.background = it.bg;
        }
        
        if (it.bgType) {
          currentBgType = it.bgType;
          bgTypeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === it.bgType);
          });
        }
        
        if (it.bgColor1) {
          bgColor1.value = it.bgColor1;
        }
        
        if (it.bgColor2) {
          bgColor2.value = it.bgColor2;
          bgColor2.style.display = currentBgType === 'gradient' ? 'block' : 'none';
        }
        
        updateBackgroundColor();
        
        if (it.logo) {
          const img = new Image();
          img.onload = () => {
            logoPreview.innerHTML = '';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            logoPreview.appendChild(img);
          };
          img.src = it.logo;
        } else {
          logoPreview.innerHTML = 'LC';
          logoPreview.style.background = 'linear-gradient(135deg, #6e44ff, #00e5ff)';
        }
        
        // Load new QR Code settings
        if (it.qrVisible) {
          if (!qrCodeVisible) toggleQrCode();
          
          if (it.qrStyle) {
            document.getElementById('qrStyle').value = it.qrStyle;
            updateQrStyle();
          }
          
          if (it.qrPosition) {
            document.getElementById('qrPosition').value = it.qrPosition;
            updateQrPosition();
          }
          
          if (it.qrCustomPosition) {
            qrCodeContainer.setAttribute('data-x', it.qrCustomPosition.x);
            qrCodeContainer.setAttribute('data-y', it.qrCustomPosition.y);
            if (it.qrPosition === 'custom') {
              qrCodeContainer.style.transform = `translate(${it.qrCustomPosition.x}px, ${it.qrCustomPosition.y}px)`;
            }
          }
          
          if (it.qrColor) {
            qrColor.value = it.qrColor;
            qrColorPreview.style.background = it.qrColor;
          }
          
          if (it.qrBgColor) {
            qrBgColor.value = it.qrBgColor;
            qrBgColorPreview.style.background = it.qrBgColor;
          }
          
          if (it.qrSize) {
            qrCodeContainer.style.width = it.qrSize;
            qrCodeContainer.style.height = it.qrSize;
            qrSize.value = parseInt(it.qrSize);
            qrSizeValue.textContent = it.qrSize;
          }
          
          updateQrCode();
        } else if (qrCodeVisible) {
          toggleQrCode();
        }
      }

      // Clear all
      clearAll.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all saved designs?')) {
          localStorage.removeItem('bc_saved');
          renderSaved();
        }
      });

      // Keyboard shortcut for save
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
          e.preventDefault();
          saveDesign();
        }
        // Shortcut for QR Code toggle
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'q') {
          e.preventDefault();
          toggleQrCode();
        }
      });

      // Enable drag and drop
      interact('.draggable').draggable({
        modifiers: [
          interact.modifiers.restrict({
            restriction: card,
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          })
        ],
        listeners: {
          start(event) {
            event.target.classList.add('dragging');
          },
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end(event) {
            event.target.classList.remove('dragging');
          }
        }
      });

      // Grid helper
      let gridOn = false;
      toggleGridBtn.addEventListener('click', () => {
        gridOn = !gridOn;
        if (gridOn) {
          card.style.backgroundImage = 'linear-gradient(transparent 24px, rgba(0,0,0,0.02) 25px), linear-gradient(90deg, transparent 24px, rgba(0,0,0,0.02) 25px)';
          card.style.backgroundSize = '25px 25px';
          toggleGridBtn.textContent = 'Disable Grid';
        } else {
          updateBackgroundColor();
          toggleGridBtn.textContent = 'Enable Grid';
        }
      });

      // ===== New QR Code Functions =====
      
      // Enhanced toggle function
      function toggleQrCode() {
        qrCodeVisible = !qrCodeVisible;
        
        if (qrCodeVisible) {
          qrCodeContainer.style.display = 'block';
          qrSettings.style.display = 'block';
          toggleQrBtn.classList.add('active');
          
          // Apply current settings
          updateQrStyle();
          updateQrPosition();
          generateQrCode();
          
          // Add appearance animation
          qrCodeContainer.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
          qrCodeContainer.style.animation = 'fadeOut 0.3s ease-in-out';
          setTimeout(() => {
            qrCodeContainer.style.display = 'none';
            qrSettings.style.display = 'none';
            toggleQrBtn.classList.remove('active');
            if (qrCode) {
              qrCode.clear();
              qrCode = null;
            }
          }, 250);
        }
      }
      
      // Enhanced QR Code generation with UTF-8 support
      function generateQrCode() {
        if (qrCode) {
          qrCode.clear();
          qrCodeContainer.innerHTML = '';
        }
        
        // Create vCard content with UTF-8 support
        const vCardData = `BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:${encodeURIComponent(nameInput.value)}
FN;CHARSET=UTF-8:${encodeURIComponent(nameInput.value)}
TITLE;CHARSET=UTF-8:${encodeURIComponent(roleInput.value)}
ORG;CHARSET=UTF-8:Digital Business Card
TEL:${phoneInput.value.replace(/\s/g, '')}
EMAIL:${emailInput.value}
URL:${webLabel.textContent}
NOTE;CHARSET=UTF-8:Created with Digital Business Card Creator
END:VCARD`;
        
        const qrSize = parseInt(qrCodeContainer.style.width) - 20;
        
        qrCode = new QRCode(qrCodeContainer, {
          text: vCardData,
          width: Math.max(qrSize, 50),
          height: Math.max(qrSize, 50),
          colorDark: qrColor.value,
          colorLight: qrBgColor.value,
          correctLevel: QRCode.CorrectLevel.Q
        });
      }
      
      // Update visual style
      function updateQrStyle() {
        currentQrStyle = document.getElementById('qrStyle').value;
        qrCodeContainer.className = `qr-style-${currentQrStyle}`;
        
        // Apply additional enhancements based on style
        switch(currentQrStyle) {
          case 'modern':
            qrCodeContainer.style.border = '3px solid var(--primary)';
            break;
          case 'minimal':
            qrCodeContainer.style.border = '1px solid #e0e0e0';
            break;
          case 'glass':
            qrCodeContainer.style.background = 'rgba(255, 255, 255, 0.85)';
            qrCodeContainer.style.backdropFilter = 'blur(30px)';
            break;
          case 'transparent':
            qrCodeContainer.style.background = 'transparent';
            qrCodeContainer.style.boxShadow = 'none';
            break;
        }
        
        if (qrCodeVisible) updateQrCode();
      }
      
      // Update position with AI enhancements
      function updateQrPosition() {
        currentQrPosition = document.getElementById('qrPosition').value;
        
        // Reset all positions
        qrCodeContainer.style.top = 'auto';
        qrCodeContainer.style.right = 'auto';
        qrCodeContainer.style.bottom = 'auto';
        qrCodeContainer.style.left = 'auto';
        qrCodeContainer.style.transform = 'none';
        
        const positions = {
          'bottom-right': { bottom: '20px', right: '20px' },
          'bottom-left': { bottom: '20px', left: '20px' },
          'top-right': { top: '20px', right: '20px' },
          'top-left': { top: '20px', left: '20px' },
          'center-right': { top: '50%', right: '20px', transform: 'translateY(-50%)' },
          'custom': { } // No change - controlled by dragging
        };
        
        Object.assign(qrCodeContainer.style, positions[currentQrPosition]);
      }
      
      // Update QR Code when settings change
      function updateQrCode() {
        if (qrCodeVisible) {
          generateQrCode();
        }
      }
      
      // Enhanced drag and drop for QR Code
      function initQrCodeDrag() {
        interact('#qrCodeContainer').draggable({
          modifiers: [
            interact.modifiers.restrict({
              restriction: card,
              endOnly: true,
              elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            })
          ],
          listeners: {
            start(event) {
              event.target.style.zIndex = '1000';
              event.target.classList.add('dragging');
              // Change position to custom when dragging
              document.getElementById('qrPosition').value = 'custom';
            },
            move(event) {
              const target = event.target;
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
              
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
              
              // Update relative positions
              target.style.top = 'auto';
              target.style.right = 'auto';
              target.style.bottom = 'auto';
              target.style.left = 'auto';
            },
            end(event) {
              event.target.style.zIndex = '100';
              event.target.classList.remove('dragging');
            }
          }
        });
      }

      // ===== Enhanced Event Listeners Setup =====
      toggleQrBtn.addEventListener('click', toggleQrCode);
      
      // Setup advanced QR Code controls
      document.getElementById('qrStyle').addEventListener('change', updateQrStyle);
      document.getElementById('qrPosition').addEventListener('change', updateQrPosition);
      document.getElementById('qrColor').addEventListener('input', function() {
        qrColorPreview.style.background = this.value;
        updateQrCode();
      });
      
      document.getElementById('qrBgColor').addEventListener('input', function() {
        qrBgColorPreview.style.background = this.value;
        updateQrCode();
      });
      
      document.getElementById('qrSize').addEventListener('input', function() {
        const size = this.value;
        qrSizeValue.textContent = `${size}px`;
        qrCodeContainer.style.width = `${size}px`;
        qrCodeContainer.style.height = `${size}px`;
        updateQrCode();
      });

      // Initialize drag and drop after DOM loads
      document.addEventListener('DOMContentLoaded', function() {
        initQrCodeDrag();
      });

      // Initial setup
      renderSaved();
      
      // Make functions globally available for use
      window.loadDesign = loadDesign;
      window.deleteDesign = deleteDesign;
    })();
