![App Screenshot](https://media.discordapp.net/attachments/1146036502896332840/1146036682890682525/logo_medium.png)

<h1 align='center'>Lyre Scripts → lyre_textui</a></h1>
<p align='center'><a href='https://discord.gg/w8Tde2JBAD'>Our discord</a> - <a href='https://lyre.tebex.io/'>Our store</a></b></h5> - <a href='https://lyre-docs.work-fivem.fr/'>Our documentation</a></b></h5>

<p align='center'><b>An advanced textui lib for FiveM</b></p>

Lyre Text UI relies on exports to function. Here is the list of exports:
- ``addTextUI`` → Allows adding an instruction to the text UI.
- ``removeTextUI`` → Permits the removal of an instruction from the text UI.
- ``setStyleArgs`` → Provides interaction with certain styling features.
- ``editTextUI`` → Allow edit an existing Text UI

There are several types of instructions that you can display on the text UI:
1. ``text`` → This represents simple text, which can be formatted with HTML code.
2. ``keyboard`` → This represents a key, followed by text.
3. ``progress`` → This represents a progress bar.

You can find a usage example in the ``example_textui.lua`` file

The usage example will make TextUIs looking like this with the "heavy" theme:

![App Screenshot](https://media.discordapp.net/attachments/1151468501479989378/1151468532358451211/image.png)

[![GPL 3.0 License](https://img.shields.io/badge/License-GPL3-red.svg)](https://github.com/conquestia/cta_core/blob/main/LICENSE)
