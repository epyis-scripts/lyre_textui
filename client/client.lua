local textUIs = {}

local function generateNewKey()
	local newKey = 0
	for key, _ in pairs(textUIs) do
		if type(key) == "number" and key > newKey then
			newKey = key
		end
	end
	return newKey + 1
end

local function getMaxKey()
	local maxKey = 0
	for key, _ in pairs(textUIs) do
		if type(key) == "number" and key > maxKey then
			maxKey = key
		end
	end
	return maxKey
end

local function addTextUI(textui)
	if not textui then
		return nil
	end
	if not textui.type then
		return nil
	end
	if not textui.content then
		return nil
	end
	if textui.type ~= "text" and textui.type ~= "keyboard" and textui.type ~= "progress" then
		return nil
	end
	local textui_id = generateNewKey()
	textUIs[textui_id] = textui
	textUIs[textui_id].identifier = textui_id
	textUIs[textui_id].styleArgs = {}
	SendNUIMessage({ type = "showui" })
	SendNUIMessage({ type = "addTextUI", detail = textUIs[textui_id] })
	return textUIs[textui_id]
end

local function removeTextUI(identifier)
	if not textUIs[identifier] then
		return identifier
	end
	textUIs[identifier] = nil
	SendNUIMessage({ type = "removeTextUI", detail = identifier })
	if getMaxKey() > 0 then
		return nil
	end
	SendNUIMessage({ type = "hideui" })
	return nil
end

local function setStyleArgs(identifier, args)
	if not textUIs[identifier] then
		return false
	end
	if not args or type(args) ~= "table" then
		return false
	end
	textUIs[identifier].styleArgs = args
	SendNUIMessage({ type = "setStyleArgs", args = args, identifier = identifier })
	return true
end

local function editTextUI(identifier, textui)
	if not textUIs[identifier] then
		return
	end
	if not textui or type(textui) ~= "table" then
		return
	end
	textUIs[identifier] = textui
	textUIs[identifier].identifier = identifier
	SendNUIMessage({ type = "editTextUI", detail = textUIs[identifier] })
	return textUIs[identifier]
end

exports("addTextUI", addTextUI)
exports("removeTextUI", removeTextUI)
exports("setStyleArgs", setStyleArgs)
exports("editTextUI", editTextUI)
