-- main functions --
local function OpenUI()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'SHOW_UI' })
end

-- nui callbacks --
RegisterNUICallback('SELECT', function(data, cb)
    SetNuiFocus(false, false)

    print(json.encode(data, {indent=true}))
    
    -- write your own functionality by received data
end)

RegisterNUICallback('CLOSE_UI', function()
    SetNuiFocus(false, false)
end)

-- commands --
RegisterCommand('testui', function()
    OpenUI()
end)
