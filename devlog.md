# personal site devlog

13 hours logged. built my personal site from scratch, html css js only. dark grunge/y2k/emo vibe. no libraries no frameworks just raw code.

opens with a piano key loading animation... 7 white bars pressing down in sequence like keys being played, fades out after the page loads. replaced the default cursor with a custom one, a hollow circle that follows your mouse and a trailing dot behind it with a smooth lerp. glows blue on hover over anything clickable. whole page has film grain overlay and vignette so it feels like a worn VHS tape. grain actually shifts position to look like real film.

hero section is the densest part. 16 floating images covering the entire viewport including the center, overlapping each other, all with parallax that shifts based on your mouse position. each image has a data-depth value so they move at different speeds. every image is also draggable. behind the name theres a canvas running 60 particles drifting around, connected by faint lines when they get close to each other. "SUBHANSH" has a VHS glitch effect that fires briefly every 8 seconds... not the neon RGB kind, more like a worn tape tracking issue. each letter floats independently with staggered delays. the tagline "pianist / flautist / builder" types out character by character with a blinking cursor. hero also has scanlines, a VHS tracking line sweeping down the screen, scratches, crosses, spider webs in all 4 corners and spiders scattered around at low opacity. that old myspace goth energy fr

every section has the same set of goth dressings... crosses, scratches, spider webs in corners, faint stains and tiny dots. all at 2-6% opacity so its background texture not in-your-face graphics. thin gradient dividers with tick marks between each section.

about section image has a 3D tilt effect that follows your cursor in perspective. also has an offset border that expands on hover and a scanline overlay. stat counters animate up from 0 when they scroll into view. hobbies section has draggable image windows you can actually grab and move around. project rows shift left on hover with a gradient glow sweep and the tilt effect. gallery items have labels that slide up from the bottom.

music section has a 24-bar visualizer that pulses at different speeds and a mini piano that actually plays real notes through the Web Audio API. you can click the keys or use your keyboard (a-k for white keys, wetyu for black ones). triangle wave, accurate frequencies, keys visually depress when pressed. ong this was the funnest part to build

contact section has a terminal that types out commands when it scrolls into view, handles html tags properly so the colored prompt text doesnt break. social cards and nav links have a magnetic effect... elements physically follow your cursor before snapping back when you leave. responsive on mobile with hamburger menu, custom cursor and all decorations hidden on small screens. visitor counter in the footer stored in localStorage.

13 hours straight. going to sleep lol
