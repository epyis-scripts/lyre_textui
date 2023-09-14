-- IF YOU WANT TO SEE THE EXAMPLE TEXT UI IN GAME, JUST ADD 'client_script "example_textui.lua"' IN THE fxmanifest.lua FILE

Citizen.CreateThread(function()
	local coords = vec3(228.39831542969, -801.57702636719, 30.581394195557)
	local textui_increase
	local textui_decrease
	local textui_progress
	while true do
		local ped = PlayerPedId()
		local pedCoords = GetEntityCoords(ped)
		if #(pedCoords - coords) < 5 then
			textui_increase = textui_increase
				or exports.lyre_textui:addTextUI({
					type = "keyboard",
					content = {
						text = "Increase <div class='important'>the progress bar</div>menu test",
						keyboard = "E",
					},
				})
			textui_decrease = textui_decrease
				or exports.lyre_textui:addTextUI({
					type = "keyboard",
					content = {
						text = "Decrease the progress bar",
						keyboard = "F",
					},
				})
			textui_progress = textui_progress
				or exports.lyre_textui:addTextUI({
					type = "progress",
					content = {
						text = "Test progress bar",
						min = 0,
						max = 100,
						current = 10,
					},
				})
			if IsControlJustPressed(0, 38) then
				exports.lyre_textui:setStyleArgs(textui_increase.identifier, { "pressed" })
				Citizen.SetTimeout(200, function()
					exports.lyre_textui:setStyleArgs(textui_increase and textui_increase.identifier, {})
				end)
				if textui_progress then
					textui_progress = exports.lyre_textui:editTextUI(textui_progress.identifier, {
						type = "progress",
						content = {
							text = "Test progress bar",
							min = 0,
							max = 100,
							current = textui_progress.content.current < 100 and textui_progress.content.current + 10
								or 100,
						},
					})
				end
			end
			if IsControlJustPressed(0, 23) then
				exports.lyre_textui:setStyleArgs(textui_decrease.identifier, { "pressed" })
				Citizen.SetTimeout(200, function()
					exports.lyre_textui:setStyleArgs(textui_decrease and textui_decrease.identifier, {})
				end)
				if textui_progress then
					textui_progress = exports.lyre_textui:editTextUI(textui_progress.identifier, {
						type = "progress",
						content = {
							text = "Test progress bar",
							min = 0,
							max = 100,
							current = textui_progress.content.current > 0 and textui_progress.content.current - 10 or 0,
						},
					})
				end
			end
		else
			textui_increase = exports.lyre_textui:removeTextUI(textui_increase and textui_increase.identifier)
			textui_decrease = exports.lyre_textui:removeTextUI(textui_decrease and textui_decrease.identifier)
			textui_progress = exports.lyre_textui:removeTextUI(textui_progress and textui_progress.identifier)
		end
		Citizen.Wait(1)
	end
end)

Citizen.CreateThread(function()
	local coords = vec3(228.39831542969, -801.57702636719, 30.581394195557)
	-- local coords2 = vec3(232.99717712402, -795.13751220703, 30.558082580566)
	while true do
		DrawMarker(1, coords.x, coords.y, coords.z - 1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 10.0, 10.0, 0.5, 255, 0, 0, 255, false, false, 1, false)
		-- DrawMarker(1, coords2.x, coords2.y, coords2.z - 1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 10.0, 10.0, 0.5, 0, 255, 0, 255, false, false, 1, false)
		Citizen.Wait(1)
	end
end)